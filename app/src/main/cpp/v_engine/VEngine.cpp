//
// Created by kozlo on 11/16/2023.
//

#include "headers/libplatform/libplatform.h"
#include "headers/v8.h"


#include <android/log.h>
#include <string>
#include "VEngine.h"

/* the following references need to be around somewhere,
 * either as global (not recommended), or in some object,
 * otherwise they'll get garbage collected by C++
 * and cause a segmentation fault crash
 */
std::unique_ptr<v8::Platform> platform;
v8::Isolate *isolate;
v8::Persistent<v8::Context> persistentContext;
v8::Local<v8::Context> context;

void PRINT(const v8::FunctionCallbackInfo<v8::Value>& args) {
    for (int i=0;i<args.Length();i++) {
        v8::String::Utf8Value str(isolate, args[i]->ToString(context).ToLocalChecked());
        __android_log_print(ANDROID_LOG_INFO, "vEngine", "%s", *str);
    }
}

const char* getJsSource(JNIEnv *env) {
    jclass clazz = env->FindClass("com/vengine_android/VEngine");
    jmethodID messageMe = env->GetStaticMethodID(clazz, "getJsSource", "()Ljava/lang/String;");
    jstring  val = static_cast<jstring>(env->CallStaticObjectMethod(clazz, messageMe));
    return env->GetStringUTFChars(val, NULL);
}

void VEngine::log(int level, const std::string& message) {
    __android_log_print(level, "vEngine", "%s", message.c_str());
}

void VEngine::log_info(const std::string& message) {
    log(ANDROID_LOG_INFO, message);
}

void VEngine::log_warn(const std::string& message) {
    log(ANDROID_LOG_WARN, message);
}

void VEngine::initV8() {
    log_info("Initialize V8");
    v8::V8::InitializeICU();
    platform = v8::platform::NewDefaultPlatform();
    v8::V8::InitializePlatform(&(*platform));
    v8::V8::Initialize();

    // Create a new Isolate and make it the current one.
    v8::Isolate::CreateParams create_params;
    create_params.array_buffer_allocator = v8::ArrayBuffer::Allocator::NewDefaultAllocator();
    isolate = v8::Isolate::New(create_params);

    v8::Isolate::Scope isolate_scope(isolate);
    // Create a stack-allocated handle scope.
    v8::HandleScope handle_scope(isolate);

    // Create a new context.
    v8::Local<v8::Context> _context = v8::Context::New(isolate);

    // attach the context to the persistent context, to avoid V8 GC-ing it
    persistentContext.Reset(isolate, _context);
    log_info("V8 is ready");
}

jstring VEngine::getStr(JNIEnv *env) {

    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);

    // Enter the context for compiling and running the hello world script.
    context = v8::Local<v8::Context>::New(isolate, persistentContext);
    v8::Context::Scope context_scope(context);


    v8::Local<v8::Object> nativeBridge = v8::Object::New(isolate);
    nativeBridge->Set(
        context,
        v8::String::NewFromUtf8(isolate, "PRINT").ToLocalChecked(),
        v8::Function::New(context, PRINT).ToLocalChecked()
    );
    nativeBridge->Set(
        context,
        v8::String::NewFromUtf8(isolate, "PI").ToLocalChecked(),
        v8::Number::New(isolate, 3.14)
    );

    context->Global()->Set(
        context,
        v8::String::NewFromUtf8(isolate, "__nativeBridge__").ToLocalChecked(),
        nativeBridge
    );

    std::string code = getJsSource(env);
    log_info(code);
    // Create a string containing the JavaScript source code.
    v8::Local<v8::String> source = v8::String::NewFromUtf8(
            isolate, code.c_str(), v8::NewStringType::kNormal).ToLocalChecked();

    // Compile the source code.
    v8::Local<v8::Script> script =
            v8::Script::Compile(context, source).ToLocalChecked();

    // Run the script to get the result.
    v8::Local<v8::Value> result = script->Run(context).ToLocalChecked();


    // Convert the result to an UTF8 string and print it.
    v8::String::Utf8Value utf8(isolate, result);

    // https://stackoverflow.com/questions/71378759/call-js-functions-in-v8-from-c
    v8::Local<v8::Value> fn_value = context->Global()->Get(context, v8::String::NewFromUtf8(isolate, "getAnswer").ToLocalChecked()).ToLocalChecked();
    v8::Local<v8::Value> foo_arg = v8::Number::New(isolate, 43.0);
    v8::MaybeLocal<v8::Value> foo_ret = fn_value.As<v8::Object>()->CallAsFunction(context, context->Global(), 1, &foo_arg);
    v8::String::Utf8Value foo_ret_as_str(isolate, foo_ret.ToLocalChecked());

    return env->NewStringUTF(*foo_ret_as_str);
}
