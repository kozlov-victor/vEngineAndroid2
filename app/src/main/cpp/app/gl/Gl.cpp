//
// Created by kozlo on 11/18/2023.
//

#include "Gl.h"
#include "app/globals/globals.h"
#include <GLES2/gl2.h>

void Gl::create(v8::Local<v8::Context> *context_local) {
    v8::Local<v8::Object> gl = v8::Object::New(isolate);
    gl->Set(
        *context_local,
        v8::String::NewFromUtf8(isolate, "COLOR_BUFFER_BIT").ToLocalChecked(),
        v8::Number::New(isolate, GL_COLOR_BUFFER_BIT)
    );
    gl->Set(
        *context_local,
        v8::String::NewFromUtf8(isolate, "clearColor").ToLocalChecked(),
        v8::Function::New(*context_local,
      [](const v8::FunctionCallbackInfo<v8::Value>& args) {
            GLfloat r = static_cast<GLfloat>(args[0]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
            GLfloat g = static_cast<GLfloat>(args[1]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
            GLfloat b = static_cast<GLfloat>(args[2]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
            GLfloat a = static_cast<GLfloat>(args[3]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
            glClearColor(r,g,b,a);
        }).ToLocalChecked()
    );
    gl->Set(
            *context_local,
            v8::String::NewFromUtf8(isolate, "clear").ToLocalChecked(),
            v8::Function::New(*context_local,
              [](const v8::FunctionCallbackInfo<v8::Value>& args) {
                  GLbitfield mask = static_cast<GLbitfield>(args[0]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
                  glClear(mask);
              }).ToLocalChecked()
    );
    (*context_local)->Global()->Set(
            *context_local,
            v8::String::NewFromUtf8(isolate, "_gl").ToLocalChecked(),
            gl
    );
}
