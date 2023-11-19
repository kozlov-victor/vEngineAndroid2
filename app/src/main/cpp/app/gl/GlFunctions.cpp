//
// Created by kozlo on 11/19/2023.
//

#include "GlFunctions.h"
#include "app/globals/globals.h"
#include <GLES2/gl2.h>

void v_activeTexture(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum tex = static_cast<GLenum>(args[0]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    glActiveTexture(tex);
}

void v_clearColor(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLfloat r = static_cast<GLfloat>(args[0]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    GLfloat g = static_cast<GLfloat>(args[1]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    GLfloat b = static_cast<GLfloat>(args[2]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    GLfloat a = static_cast<GLfloat>(args[3]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    glClearColor(r,g,b,a);
}

void v_clear(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLbitfield mask = static_cast<GLbitfield>(args[0]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    glClear(mask);
}

void GlFunctions::create(v8::Local<v8::Context> &context_local, v8::Local<v8::Object> &gl) {
    gl->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "activeTexture").ToLocalChecked(),
        v8::Function::New(context_local,v_activeTexture).ToLocalChecked()
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "clearColor").ToLocalChecked(),
            v8::Function::New(context_local,v_clearColor).ToLocalChecked()
    );
    gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "clear").ToLocalChecked(),
            v8::Function::New(context_local,v_clear).ToLocalChecked()
    );

}
