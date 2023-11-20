//
// Created by kozlo on 11/19/2023.
//

#include "GlFunctions.h"
#include <GLES2/gl2.h>
#include "app/logger/Logger.h"

GLuint getIdFromV8GlObject(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    if (args[i]->IsNull()) return 0;
    return
        args[i]->ToObject(isolate->GetCurrentContext()).ToLocalChecked()->
        Get(
            isolate->GetCurrentContext(),
            v8::String::NewFromUtf8(isolate, "$id").ToLocalChecked()
        ).ToLocalChecked()->
        ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value();
}

v8::Local<v8::Object> createV8GlObjectFromId(const v8::FunctionCallbackInfo<v8::Value>& args,GLuint id) {
    v8::Isolate *isolate = args.GetIsolate();
    v8::Local<v8::Object> obj = v8::Object::New(isolate);
    obj->Set(
        isolate->GetCurrentContext(),
        v8::String::NewFromUtf8(isolate, "$id").ToLocalChecked(),
        v8::Integer::New(isolate, id)
    );
    return obj;
}

GLfloat getFloatParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLfloat>(args[i]->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLbitfield getBitfieldParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLbitfield>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLuint getGlUIntParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLuint>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLint getGlIntParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLint>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLboolean getGlBooleanParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLboolean>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLenum getGlEnumParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLenum>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLintptr getGlIntPtrParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLintptr>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLsizeiptr getGlSizeParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLsizeiptr>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

GLsizei getGlSizeiParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    return static_cast<GLsizei>(args[i]->ToInteger(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

char* getGlStringParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate *isolate = args.GetIsolate();
    v8::String::Utf8Value str(isolate, args[i]->ToString(isolate->GetCurrentContext()).ToLocalChecked());
    return *str;
}

v8::Local<v8::ArrayBuffer> getArrayBuffer(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    if (args[i]->IsArrayBuffer()) {
        return v8::Handle<v8::ArrayBuffer>::Cast(args[1]);
    } else {
        v8::Handle<v8::ArrayBufferView> bufview_data = v8::Handle<v8::ArrayBufferView>::Cast(args[1]);
        return bufview_data->Buffer();
    }
}


void activeTexture(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum tex = getGlEnumParameter(args,0);
    glActiveTexture(tex);
}

void attachShader(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint program = getIdFromV8GlObject(args,0);
    GLuint shader = getIdFromV8GlObject(args,1);
    glAttachShader(program, shader);
}

void bindAttribLocation(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint program = getIdFromV8GlObject(args,0);
    GLuint index = getGlUIntParameter(args,1);
    char* name = getGlStringParameter(args,2);
    glBindAttribLocation(program, index, name);
}

void bindBuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint target = getGlUIntParameter(args, 0);
    GLuint buffer = getIdFromV8GlObject(args,1);
    glBindBuffer(target, buffer);
}

void bindFramebuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint target = getGlUIntParameter(args, 0);
    GLuint buffer = getIdFromV8GlObject(args,1);
    glBindFramebuffer(target, buffer);
}

void bindRenderbuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint target = getGlUIntParameter(args, 0);
    GLuint buffer = getIdFromV8GlObject(args,1);
    glBindRenderbuffer(target, buffer);
}

void bindTexture(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint target = getGlUIntParameter(args, 0);
    GLuint texture = getIdFromV8GlObject(args,1);
    glBindTexture(target, texture);
}

void blendColor(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLfloat r = getFloatParameter(args,0);
    GLfloat g = getFloatParameter(args,1);
    GLfloat b = getFloatParameter(args,2);
    GLfloat a = getFloatParameter(args,3);
    glBlendColor(r,g,b,a);
}

void blendEquation(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum mode = getGlEnumParameter(args, 0);
    glBlendEquation(mode);
}

void blendEquationSeparate(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum modeRGB = getGlEnumParameter(args, 0);
    GLenum modeAlpha = getGlEnumParameter(args, 1);
    glBlendEquationSeparate(modeRGB,modeAlpha);
}

void blendFunc(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum sfactor = getGlEnumParameter(args, 0);
    GLenum dfactor = getGlEnumParameter(args, 1);
    glBlendFunc(sfactor,dfactor);
}

void blendFuncSeparate(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum sfactorRGB = getGlEnumParameter(args, 0);
    GLenum dfactorRGB = getGlEnumParameter(args, 1);
    GLenum sfactorAlpha = getGlEnumParameter(args, 2);
    GLenum dfactorAlpha = getGlEnumParameter(args, 3);
    glBlendFuncSeparate(sfactorRGB,dfactorRGB,sfactorAlpha,dfactorAlpha);
}

void bufferData(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum target = getGlEnumParameter(args,0);
    GLenum usage = getGlEnumParameter(args,2);
    if(args[1]->IsArrayBufferView() || args[1]->IsArrayBufferView()) {
        v8::Handle<v8::ArrayBuffer> buf_data = getArrayBuffer(args, 1);
        v8::ArrayBuffer::Contents con_data=buf_data->GetContents();
        auto size = static_cast<GLsizeiptr>(con_data.ByteLength());
        void *data = con_data.Data();
        glBufferData(target,size,data,usage);
    } else {
        GLsizeiptr size = getGlSizeParameter(args,1);
        glBufferData(target,size,NULL,usage);
    }
}

void bufferSubData(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum target = getGlEnumParameter(args, 0);
    GLintptr offset = getGlIntPtrParameter(args, 1);
    v8::Handle<v8::ArrayBuffer> buf_data = getArrayBuffer(args,2);
    v8::ArrayBuffer::Contents con_data=buf_data->GetContents();
    auto size = static_cast<GLsizeiptr>(con_data.ByteLength());
    void *data = con_data.Data();
    glBufferSubData(target,offset,size,data);
}

void checkFramebufferStatus(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum target = getGlEnumParameter(args, 0);
    GLenum status = glCheckFramebufferStatus(target);
    args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(), status));
}

void clear(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLbitfield mask = getBitfieldParameter(args,0);
    glClear(mask);
}

void clearColor(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLfloat r = getFloatParameter(args,0);
    GLfloat g = getFloatParameter(args,1);
    GLfloat b = getFloatParameter(args,2);
    GLfloat a = getFloatParameter(args,3);
    glClearColor(r,g,b,a);
}

void clearStencil(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLint s = getGlIntParameter(args,0);
    glClearStencil(s);
}

void colorMask(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLboolean r = getGlBooleanParameter(args,0);
    GLboolean g = getGlBooleanParameter(args,1);
    GLboolean b = getGlBooleanParameter(args,2);
    GLboolean a = getGlBooleanParameter(args,3);
    glColorMask(r,g,b,a);
}

void compileShader(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint shader = getIdFromV8GlObject(args, 0);
    glCompileShader(shader);
}

// c function void compressedTexImage2D ( gLenum target, gLint level, gLenum internalformat, gLsizei width, gLsizei height, gLint border, gLsizei imageSize, const gLvoid *data )
// not implemented in webgl

// c function void compressedTexSubImage2D ( gLenum target, gLint level, gLint xoffset, gLint yoffset, gLsizei width, gLsizei height, gLenum format, gLsizei imageSize, const gLvoid *data )
// not implemented webgl

void copyTexImage2D(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum target = getGlEnumParameter(args,0);
    GLint level = getGlIntParameter(args,1);
    GLenum internalformat = getGlEnumParameter(args,2);
    GLint x = getGlIntParameter(args,3);
    GLint y = getGlIntParameter(args,4);
    GLsizei width = getGlSizeiParameter(args,5);
    GLsizei height = getGlSizeiParameter(args,6);
    GLint border = getGlIntParameter(args,7);
    glCopyTexImage2D(target,level,internalformat,x,y,width,height,border);
}

void copyTexSubImage2D(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum target = getGlEnumParameter(args,0);
    GLint level = getGlIntParameter(args,1);
    GLint xoffset = getGlIntParameter(args,2);
    GLint yoffset = getGlIntParameter(args,3);
    GLint x = getGlIntParameter(args,4);
    GLint y= getGlIntParameter(args,5);
    GLsizei width = getGlSizeiParameter(args,6);
    GLsizei height = getGlSizeiParameter(args,7);
    glCopyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
}

void createBuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLsizei n = 1;
    GLuint buffer;
    glGenBuffers(n, &buffer);
    if (buffer==0) {
        args.GetReturnValue().Set(v8::Null(args.GetIsolate()));
    } else {
        args.GetReturnValue().Set(createV8GlObjectFromId(args,buffer));
    };
}

void createProgram(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint program = glCreateProgram();
    args.GetReturnValue().Set(createV8GlObjectFromId(args,program));
}

void createShader(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum type = getGlEnumParameter(args,0);
    GLuint shader = glCreateShader(type);
    args.GetReturnValue().Set(createV8GlObjectFromId(args,shader));
}

void cullFace(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLenum  mode = getGlEnumParameter(args, 0);
    glCullFace(mode);
}

void deleteRenderbuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLsizei n = 1;
    GLuint buffer = getIdFromV8GlObject(args,0);
    glDeleteRenderbuffers(n,&buffer);
}

void deleteBuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLsizei n = 1;
    GLuint buffer = getIdFromV8GlObject(args,0);
    glDeleteBuffers(n,&buffer);
}

void deleteFramebuffer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLsizei n = 1;
    GLuint buffer = getIdFromV8GlObject(args,0);
    glDeleteFramebuffers(n,&buffer);
}

void deleteProgram(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint program = getIdFromV8GlObject(args,0);
    glDeleteProgram(program);
}

void deleteTexture(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLsizei n = 1;
    GLuint texture = getIdFromV8GlObject(args,0);
    glDeleteTextures(n, &texture);
}

void deleteShader(const v8::FunctionCallbackInfo<v8::Value>& args) {
    GLuint shader = getIdFromV8GlObject(args,0);
    glDeleteShader(shader);
}

struct Fun {
    std::string name;
    void (*value)(const v8::FunctionCallbackInfo<v8::Value>&);
};

void GlFunctions::create(v8::Isolate *isolate,v8::Local<v8::Context> &context_local, v8::Local<v8::Object> &gl) {

    std::vector<Fun> funcs = {
        {"activeTexture", activeTexture},
        {"attachShader", attachShader},
        {"bindAttribLocation", bindAttribLocation},
        {"bindBuffer", bindBuffer},
        {"bindFramebuffer", bindFramebuffer},
        {"bindRenderbuffer", bindRenderbuffer},
        {"bindTexture", bindTexture},
        {"blendColor", blendColor},
        {"blendEquation", blendEquation},
        {"blendEquationSeparate", blendEquationSeparate},
        {"blendFunc", blendFunc},
        {"blendFuncSeparate", blendFuncSeparate},
        {"bufferData", bufferData},
        {"bufferSubData", bufferSubData},
        {"checkFramebufferStatus", checkFramebufferStatus},
        {"clear", clear},
        {"clearColor", clearColor},
        {"clearStencil", clearStencil},
        {"colorMask", colorMask},
        {"compileShader", compileShader},
        {"copyTexImage2D", copyTexImage2D},
        {"copyTexSubImage2D", copyTexSubImage2D},
        {"createBuffer", createBuffer},
        {"createProgram", createProgram},
        {"createShader", createShader},
        {"cullFace", cullFace},
        {"deleteRenderbuffer", deleteRenderbuffer},
        {"deleteBuffer", deleteBuffer},
        {"deleteFramebuffer", deleteFramebuffer},
        {"deleteProgram", deleteProgram},
        {"deleteTexture", deleteTexture},
        {"deleteShader", deleteShader},
    };

    for(const Fun& f : funcs) {
        gl->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, f.name.c_str()).ToLocalChecked(),
            v8::Function::New(context_local,f.value).ToLocalChecked()
        );
    }

}
