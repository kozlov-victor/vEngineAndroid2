//
// Created by kozlo on 11/18/2023.
//

#include <jni.h>
#include <string>
#include <sstream>

#include <utility>
#include "Js.h"
#include "headers/libplatform/libplatform.h"
#include "headers/v8.h"
#include "app/logger/Logger.h"
#include "app/console/Console.h"
#include "app/gl/GlFields.h"
#include "app/gl/GlFunctions.h"
#include "app/js_compilation_result/JsCompilationResult.h"


JsCompilationResult reportError(v8::Isolate *isolate,v8::TryCatch &tryCatch,v8::Local<v8::Context> &context,const std::string& error) {
    v8::String::Utf8Value e(isolate, tryCatch.Exception());
    v8::String::Utf8Value trace(isolate, tryCatch.StackTrace(context).ToLocalChecked());
    v8::Local<v8::Message> message = tryCatch.Message();

    std::stringstream ss;

    ss << error << std::endl;
    ss << *e << std::endl;

    if (!message.IsEmpty()) {
        v8::String::Utf8Value filename(isolate,message->GetScriptOrigin().ResourceName());
        ss << "filename: " << *filename << ", ";
        int linenum = message->GetLineNumber(context).FromJust();
        ss << "linenum: " << linenum << ", " << std::endl;
        v8::String::Utf8Value sourceline(isolate, message->GetSourceLine(context).ToLocalChecked());
        ss << "sourceline: " << std::endl << *sourceline << std::endl;
        int start = message->GetStartColumn(context).FromJust();
        for (int i = 0; i < start; i++) {
            ss << " ";
        }
        int end = message->GetEndColumn(context).FromJust();
        for (int i = start; i < end; i++) {
            ss << "^";
        }
        ss << std::endl;
    }

    Logger::error(ss.str());

    JsCompilationResult result(false,ss.str());
    return result;
}

Js::Js() {

}

void Js::initV8() {
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

JsCompilationResult Js::compileScript(const char* fileName, const char* code) {
    Logger::info("script compiling");
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);

    // Enter the context_local for compiling and running the hello world script.
    v8::Local<v8::Context> context_local = v8::Local<v8::Context>::New(isolate, persistentContext);
    v8::Context::Scope context_scope(context_local);

    // create js global objects
    Console::create(isolate,context_local);
    v8::Local<v8::Object> gl = v8::Object::New(isolate);
    GlFields::create(isolate,context_local,gl);
    GlFunctions::create(isolate,context_local, gl);
    context_local->Global()->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "_gl").ToLocalChecked(),
        gl
    );

    // Create a string containing the JavaScript source code.
    v8::Local<v8::String> source = v8::String::NewFromUtf8(
            isolate, code, v8::NewStringType::kNormal).ToLocalChecked();

    v8::TryCatch tryCatch(isolate);

    // Compile the source code.
    v8::ScriptOrigin origin(v8::String::NewFromUtf8(isolate, fileName).ToLocalChecked());

    v8::MaybeLocal<v8::Script> script =
            v8::Script::Compile(context_local, source, &origin);

    if (script.IsEmpty()) {
        return reportError(isolate,tryCatch,context_local,"parsing error");
    } else {
        // Run the script to get the result.
        v8::MaybeLocal<v8::Value> result = script.ToLocalChecked()->Run(context_local);

        if (result.IsEmpty()) {
            return reportError(isolate,tryCatch,context_local,"evaluation error");
        }
        else {
            Logger::info("js script compiled");
            JsCompilationResult success(true,"");
            return success;
        }
    }

}

void Js::callFunc(const char *funcname,const int argc,v8::Local<v8::Value> argv[]) {
    v8::Isolate::Scope isolate_scope(isolate);
    v8::HandleScope handle_scope(isolate);
    // we have to create a local handle from the persistent handle
    // every time, see process.cc example
    v8::Handle<v8::Context> context_local =
            v8::Local<v8::Context>::New(isolate, persistentContext.Get(isolate));
    v8::Context::Scope context_scope(context_local);

    v8::TryCatch tryCatch(isolate);

    v8::Local<v8::Object> fn_value =
            context_local->Global()->Get(context_local, v8::String::NewFromUtf8(isolate, funcname).ToLocalChecked()).
                    ToLocalChecked().As<v8::Object>();

    v8::MaybeLocal<v8::Value> result =
            fn_value->CallAsFunction(context_local, context_local->Global(), argc, argv);
    if (result.IsEmpty()) {
        reportError(isolate,tryCatch,context_local,"function call error");
    }
}

void Js::dispose() {
    isolate->Dispose();
    v8::V8::Dispose();
}
