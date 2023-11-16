#include <jni.h>
#include <string>


#include "libplatform/libplatform.h"
#include "v8.h"
#include "v_engine/VEngine.h"


/* the following references need to be around somewhere,
 * either as global (not recommended), or in some object,
 * otherwise they'll get garbage collected by C++
 * and cause a segmentation fault crash
 */
std::unique_ptr<v8::Platform> platform;
v8::Isolate *isolate;
v8::Persistent<v8::Context> persistentContext;

VEngine vEngine;

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_MainActivity_initV8(JNIEnv *env, jobject thiz) {
   vEngine.initV8();
    // Initialize V8.
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
    v8::Local<v8::Context> context = v8::Context::New(isolate);

    // attach the context to the persistent context, to avoid V8 GC-ing it
    persistentContext.Reset(isolate, context);

}
extern "C"
JNIEXPORT jstring JNICALL
Java_com_vengine_1android_MainActivity_stringFromV8(JNIEnv *env, jobject thiz) {

    std::string code = "var getAnswer = (a)=>{return `answer is ${a}`;};";

    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);

    // Enter the context for compiling and running the hello world script.
    v8::Local<v8::Context> context = v8::Local<v8::Context>::New(isolate, persistentContext);
    v8::Context::Scope context_scope(context);

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
    v8::Local<v8::Value> foo_arg = v8::Number::New(isolate, 42.0);
    v8::MaybeLocal<v8::Value> foo_ret = fn_value.As<v8::Object>()->CallAsFunction(context, context->Global(), 1, &foo_arg);
    v8::String::Utf8Value foo_ret_as_str(isolate, foo_ret.ToLocalChecked());

    return env->NewStringUTF(*foo_ret_as_str);
}