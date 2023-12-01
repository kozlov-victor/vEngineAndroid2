//
// Created by kozlo on 11/18/2023.
//

#include <sstream>
#include "Console.h"
#include "../logger/Logger.h"

void log_(int level,const v8::FunctionCallbackInfo<v8::Value>& args) {
    v8::Isolate *isolate = args.GetIsolate();
    std::stringstream ss;
    for (int i=0;i<args.Length();i++) {
        v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
        ss << *str;
        if (i<args.Length()-1) ss << " ";
    }
    Logger::log(level,ss.str());
}

void Console::create(v8::Isolate *isolate,v8::Local<v8::Context> &context_local) {
    v8::Local<v8::Object> console = v8::Object::New(isolate);
    console->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "_log").ToLocalChecked(),
            v8::Function::New(context_local,
              [](auto args) {
                  log_(Logger::LEVEL_INFO,args);
              }).ToLocalChecked()
    ).Check();
    console->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "_error").ToLocalChecked(),
            v8::Function::New(context_local,
            [](auto args) {
                log_(Logger::LEVEL_ERROR,args);
            }).ToLocalChecked()
    ).Check();
    console->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "_warn").ToLocalChecked(),
            v8::Function::New(context_local,
              [](auto args) {
                  log_(Logger::LEVEL_WARN,args);
              }).ToLocalChecked()
    ).Check();
    context_local->Global()->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "console").ToLocalChecked(),
            console
    ).Check();
}
