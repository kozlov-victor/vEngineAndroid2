//
// Created by kozlo on 11/19/2023.
//

#include "GlFunctions.h"
#include "app/globals/globals.h"
#include <GLES2/gl2.h>
#include "app/logger/Logger.h"

GLuint getIdFromV8GlObject(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    if (args[i]->IsNull()) return 0;
    return
        args[i]->ToObject(isolate->GetCurrentContext()).ToLocalChecked()->
        Get(
            isolate->GetCurrentContext(),
            v8::String::NewFromUtf8(isolate, "id").ToLocalChecked()
        ).ToLocalChecked()->
        ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value();
}

GLfloat getFloatParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    return static_cast<GLfloat>(args[i]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLbitfield getBitfieldParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    return static_cast<GLbitfield>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLbitfield getGlUIntParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    return static_cast<GLuint>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

char* getGlStringParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    return *str;
}


void v_activeTexture(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum tex = static_cast<GLenum>(args[0]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
    glActiveTexture(tex);
}

void v_clearColor(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLfloat r = getFloatParameter(args,0);
    GLfloat g = getFloatParameter(args,1);
    GLfloat b = getFloatParameter(args,2);
    GLfloat a = getFloatParameter(args,3);
    glClearColor(r,g,b,a);
}

void v_clear(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLbitfield mask = getBitfieldParameter(args,0);
    glClear(mask);
}

void v_attachShader(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint program = getIdFromV8GlObject(args,0);
    GLuint shader = getIdFromV8GlObject(args,1);
    glAttachShader(program, shader);
}

void v_bindAttribLocation(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint program = getIdFromV8GlObject(args,0);
    GLuint index = getGlUIntParameter(args,1);
    char* name = getGlStringParameter(args,2);
    glBindAttribLocation(program, index, name);
}

void v_bindBuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint target = getGlUIntParameter(args, 0);
    GLuint buffer = getIdFromV8GlObject(args,1);
    glBindBuffer(target, buffer);
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
    gl->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "attachShader").ToLocalChecked(),
        v8::Function::New(context_local,v_attachShader).ToLocalChecked()
    );
    gl->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "bindAttribLocation").ToLocalChecked(),
        v8::Function::New(context_local,v_bindAttribLocation).ToLocalChecked()
    );
    gl->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "bindBuffer").ToLocalChecked(),
        v8::Function::New(context_local,v_bindBuffer).ToLocalChecked()
    );

}
