//
// Created by kozlo on 11/18/2023.
//

#include <jni.h>
#include "Js.h"
#include "headers/libplatform/libplatform.h"
#include "headers/v8.h"
#include "app/logger/Logger.h"

v8::Isolate *isolate;

const char* getJsSource(JNIEnv *env) {
    jclass clazz = env->FindClass("com/vengine_android/VEngine");
    jmethodID messageMe = env->GetStaticMethodID(clazz, "getJsSource", "()Ljava/lang/String;");
    jstring  val = static_cast<jstring>(env->CallStaticObjectMethod(clazz, messageMe));
    return env->GetStringUTFChars(val, NULL);
}

Js::Js() {

}

void Js::initV8(JNIEnv *env) {
    Logger::info("Initialize V8");
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
    Logger::info("V8 is ready");
}

void Js::compileScript(JNIEnv *env) {
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);

    // Enter the context_local for compiling and running the hello world script.
    v8::Local<v8::Context> context_local = v8::Local<v8::Context>::New(isolate, persistentContext);
    v8::Context::Scope context_scope(context_local);

    v8::Local<v8::Object> nativeBridge = v8::Object::New(isolate);
    nativeBridge->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "PRINT").ToLocalChecked(),
            v8::Function::New(context_local,
              [](const v8::FunctionCallbackInfo<v8::Value>& args) {
                  for (int i=0;i<args.Length();i++) {
                      v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
                      Logger::info(*str);
                  }
            }).ToLocalChecked()
    );
    nativeBridge->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "PI").ToLocalChecked(),
            v8::Number::New(isolate, 3.14)
    );

    context_local->Global()->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "__nativeBridge__").ToLocalChecked(),
            nativeBridge
    );

    std::string code = getJsSource(env);
    // Create a string containing the JavaScript source code.
    v8::Local<v8::String> source = v8::String::NewFromUtf8(
            isolate, code.c_str(), v8::NewStringType::kNormal).ToLocalChecked();

    v8::TryCatch tryCatch(isolate);

    // Compile the source code.
    v8::Local<v8::Script> script =
            v8::Script::Compile(context_local, source).ToLocalChecked();

    // Run the script to get the result.
    v8::Local<v8::Value> result = script->Run(context_local).ToLocalChecked();

    if (result.IsEmpty()) {
        v8::String::Utf8Value e(isolate, tryCatch.Exception());
        v8::String::Utf8Value trace(isolate, tryCatch.StackTrace(context_local).ToLocalChecked());
        Logger::error( "evaluation error" );
        Logger::error( *e );
        Logger::error( *trace );
        Logger::error("js script error");
    }
    else {
        Logger::info("js script compiled");
    }
}

void Js::callFunc() {
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);
    // we have to create a local handle from the persistent handle
    // every time, see process.cc example
    v8::Handle<v8::Context> context_local =
            v8::Local<v8::Context>::New(isolate, persistentContext.Get(isolate));
    v8::Context::Scope context_scope(context_local);

    v8::Local<v8::Value> foo_arg = v8::Number::New(isolate, ((float)rand())/RAND_MAX);
    v8::TryCatch tryCatch(isolate);

    v8::Local<v8::Object> fn_value =
            context_local->Global()->Get(context_local, v8::String::NewFromUtf8(isolate, "getAnswer").ToLocalChecked()).
                    ToLocalChecked().As<v8::Object>();

    v8::MaybeLocal<v8::Value> result =
            fn_value->CallAsFunction(context_local, context_local->Global(), 1, &foo_arg);
    if (result.IsEmpty()) {
        v8::String::Utf8Value e(isolate, tryCatch.Exception());
        v8::String::Utf8Value trace(isolate, tryCatch.StackTrace(context_local).ToLocalChecked());
        Logger::error( "function call error" );
        Logger::error( *e );
        Logger::error( *trace);
    }
}
