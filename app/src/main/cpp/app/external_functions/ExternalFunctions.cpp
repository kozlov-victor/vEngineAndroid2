//
// Created by kozlo on 11/27/2023.
//

#include <jni.h>
#include <GLES2/gl2.h>
#include "ExternalFunctions.h"
#include "app/logger/Logger.h"
#include "app/misc/fun.hpp"

JNIEnv *envClosure;

int getIntParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate* isolate = args.GetIsolate();
    if (i < 0 || i >= args.Length()) {
        Logger::error("wrong parameter index",i);
        return {};
    }
    v8::Local<v8::Value> value = args[i];
    if (!value->IsNumber()) {
        Logger::error("not a numeric parameter");
        return {};
    }
    return static_cast<int>(value->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

void setSurfaceWidth(const v8::FunctionCallbackInfo<v8::Value>& args) {
    int width = getIntParameter(args,0);
    jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
    jmethodID cid = envClosure->GetStaticMethodID(cl, "setSurfaceWidth", "(I)V");
    envClosure->CallStaticVoidMethod(cl, cid, width);
}

void getSurfaceWidth(const v8::FunctionCallbackInfo<v8::Value>& args) {
    jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
    jmethodID cid = envClosure->GetStaticMethodID(cl, "getSurfaceWidth", "()I");
    jint width = envClosure->CallStaticIntMethod(cl, cid);
    args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(),width));
}

void setSurfaceHeight(const v8::FunctionCallbackInfo<v8::Value>& args) {
    int height = getIntParameter(args,0);
    jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
    jmethodID cid = envClosure->GetStaticMethodID(cl, "setSurfaceHeight", "(I)V");
    envClosure->CallStaticVoidMethod(cl, cid, height);
}

void getSurfaceHeight(const v8::FunctionCallbackInfo<v8::Value>& args) {
    jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
    jmethodID cid = envClosure->GetStaticMethodID(cl, "getSurfaceHeight", "()I");
    jint height = envClosure->CallStaticIntMethod(cl, cid);
    args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(),height));
}

void loadBitmap(const v8::FunctionCallbackInfo<v8::Value>& args) {
    jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
    jmethodID m = envClosure->GetStaticMethodID(cl, "loadBitmap", "(Ljava/lang/String;)Lcom/vengine_android/model/BitmapInfo;");
    v8::String::Utf8Value str(args.GetIsolate(), args[0]->ToString(args.GetIsolate()->GetCurrentContext()).ToLocalChecked());
    jstring jStr = envClosure->NewStringUTF(*str);
    jobject jObj = envClosure->CallStaticObjectMethod(cl, m, jStr); // class bitmapInfo

    jclass bitmapInfoCl = envClosure->FindClass("com/vengine_android/model/BitmapInfo");
    jmethodID getIdMtd = envClosure->GetMethodID(bitmapInfoCl,"getId", "()I");
    jmethodID getWidthMtd = envClosure->GetMethodID(bitmapInfoCl,"getWidth", "()I");
    jmethodID getHeightMtd = envClosure->GetMethodID(bitmapInfoCl,"getHeight", "()I");

    jint id = envClosure->CallIntMethod(jObj,getIdMtd);
    jint width = envClosure->CallIntMethod(jObj,getWidthMtd);
    jint height = envClosure->CallIntMethod(jObj,getHeightMtd);

    v8::Local<v8::Object> result = v8::Object::New(args.GetIsolate());
    result->Set(
            args.GetIsolate()->GetCurrentContext(),
            v8::String::NewFromUtf8(args.GetIsolate(), "id").ToLocalChecked(),
            v8::Integer::NewFromUnsigned(args.GetIsolate(), id)
    ).Check();
    result->Set(
            args.GetIsolate()->GetCurrentContext(),
            v8::String::NewFromUtf8(args.GetIsolate(), "width").ToLocalChecked(),
            v8::Integer::NewFromUnsigned(args.GetIsolate(), width)
    ).Check();
    result->Set(
            args.GetIsolate()->GetCurrentContext(),
            v8::String::NewFromUtf8(args.GetIsolate(), "height").ToLocalChecked(),
            v8::Integer::NewFromUnsigned(args.GetIsolate(), height)
    ).Check();

    args.GetReturnValue().Set(result);
}

void texImage2D_6(const v8::FunctionCallbackInfo<v8::Value>& args) {
    int target = getIntParameter(args,0);
    int level = getIntParameter(args,1);;
    int bitmap = getIntParameter(args,5);;
    jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
    jmethodID m = envClosure->GetStaticMethodID(cl, "getBitmap", "(III)V");
    envClosure->CallStaticVoidMethod(cl,m,target,level,bitmap);
}

void ExternalFunctions::create(JNIEnv *env,v8::Isolate *isolate, v8::Local<v8::Context> &context_local) {
    v8::Local<v8::Object> ext = v8::Object::New(isolate);
    envClosure = env;

    std::vector<Fun> funcs = {
            {"setSurfaceWidth", setSurfaceWidth},
            {"getSurfaceWidth", getSurfaceWidth},
            {"setSurfaceHeight", setSurfaceHeight},
            {"getSurfaceHeight", getSurfaceHeight},
            {"_loadBitmap", loadBitmap},
            {"_texImage2D_6", texImage2D_6},
    };

    for(const Fun& f : funcs) {
        ext->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, f.name.c_str()).ToLocalChecked(),
            v8::Function::New(context_local, f.value).ToLocalChecked()
        ).Check();
    }

    context_local->Global()->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "_external").ToLocalChecked(),
        ext
    ).Check();
}
