//
// Created by kozlo on 11/18/2023.
//

#include "Console.h"
#include "../logger/Logger.h"
#include "app/globals/globals.h"

void Console::create(v8::Local<v8::Context> *context_local) {
    v8::Local<v8::Object> console = v8::Object::New(isolate);
    console->Set(
            *context_local,
            v8::String::NewFromUtf8(isolate, "log").ToLocalChecked(),
            v8::Function::New(*context_local,
              []
              (const v8::FunctionCallbackInfo<v8::Value>& args)->void {
                  for (int i=0;i<args.Length();i++) {
                      v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
                      Logger::info(*str);
                  }
              }).ToLocalChecked()
    );
    console->Set(
            *context_local,
            v8::String::NewFromUtf8(isolate, "error").ToLocalChecked(),
            v8::Function::New(*context_local,
                              []
                                      (const v8::FunctionCallbackInfo<v8::Value>& args)->void {
                                  for (int i=0;i<args.Length();i++) {
                                      v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
                                      Logger::error(*str);
                                  }
                              }).ToLocalChecked()
    );
    console->Set(
            *context_local,
            v8::String::NewFromUtf8(isolate, "warn").ToLocalChecked(),
            v8::Function::New(*context_local,
                              []
                                      (const v8::FunctionCallbackInfo<v8::Value>& args)->void {
                                  for (int i=0;i<args.Length();i++) {
                                      v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
                                      Logger::warn(*str);
                                  }
                              }).ToLocalChecked()
    );

    (*context_local)->Global()->Set(
            *context_local,
            v8::String::NewFromUtf8(isolate, "console").ToLocalChecked(),
            console
    );
}
