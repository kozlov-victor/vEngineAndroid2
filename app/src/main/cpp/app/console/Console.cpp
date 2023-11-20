//
// Created by kozlo on 11/18/2023.
//

#include "Console.h"
#include "../logger/Logger.h"

void log_(int level,const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate *isolate = args.GetIsolate();
    for (int i=0;i<args.Length();i++) {
        v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
        Logger::log(level,*str);
    }
}

void Console::create(v8::Isolate *isolate,v8::Local<v8::Context> &context_local) {
    v8::Local<v8::Object> console = v8::Object::New(isolate);
    console->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "log").ToLocalChecked(),
            v8::Function::New(context_local,
              [](auto args) {
                  log_(Logger::LEVEL_INFO,args);
              }).ToLocalChecked()
    );
    console->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "error").ToLocalChecked(),
            v8::Function::New(context_local,
            [](auto args) {
                log_(Logger::LEVEL_ERROR,args);
            }).ToLocalChecked()
    );
    console->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "warn").ToLocalChecked(),
            v8::Function::New(context_local,
              [](auto args) {
                  log_(Logger::LEVEL_WARN,args);
              }).ToLocalChecked()
    );
    context_local->Global()->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "console").ToLocalChecked(),
            console
    );
}
