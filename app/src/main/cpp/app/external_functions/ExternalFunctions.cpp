//
// Created by kozlo on 11/27/2023.
//

#include <jni.h>
#include <GLES2/gl2.h>
#include "ExternalFunctions.h"
#include "app/logger/Logger.h"

JNIEnv *envClosure;

template <typename T>
T getNumericParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) { // todo
    v8::Isolate* isolate = args.GetIsolate();
    if (i < 0 || i >= args.Length()) {
        Logger::error("wrong parameter index",i);
        return T();
    }
    v8::Local<v8::Value> value = args[i];
    if (!value->IsNumber()) {
        Logger::error("not a numeric parameter");
        return T();
    }
    return static_cast<T>(value->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

void ExternalFunctions::create(JNIEnv *env,v8::Isolate *isolate, v8::Local<v8::Context> &context_local) {
    v8::Local<v8::Object> ext = v8::Object::New(isolate);
    envClosure = env;
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "setSurfaceWidth").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            int width = getNumericParameter<int>(args,0);
            jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
            jmethodID cid = envClosure->GetStaticMethodID(cl, "setSurfaceWidth", "(I)V");
            envClosure->CallStaticVoidMethod(cl, cid, width);
        }).ToLocalChecked()
    ).Check();
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "getSurfaceWidth").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
            jmethodID cid = envClosure->GetStaticMethodID(cl, "getSurfaceWidth", "()I");
            jint width = envClosure->CallStaticIntMethod(cl, cid);
            args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(),width));
        }).ToLocalChecked()
    ).Check();
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "setSurfaceHeight").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            int height = getNumericParameter<int>(args,0);
            jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
            jmethodID cid = envClosure->GetStaticMethodID(cl, "setSurfaceHeight", "(I)V");
            envClosure->CallStaticVoidMethod(cl, cid, height);
        }).ToLocalChecked()
    ).Check();
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "getSurfaceHeight").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
            jmethodID cid = envClosure->GetStaticMethodID(cl, "getSurfaceHeight", "()I");
            jint height = envClosure->CallStaticIntMethod(cl, cid);
            args.GetReturnValue().Set(v8::Integer::New(args.GetIsolate(),height));
        }).ToLocalChecked()
    ).Check();
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "_loadBitmap").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
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
        }).ToLocalChecked()
    ).Check();
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "_texImage2D_6").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            int target = getNumericParameter<int>(args,0);
            int level = getNumericParameter<int>(args,1);;
            int bitmap = getNumericParameter<int>(args,5);;
            jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
            jmethodID m = envClosure->GetStaticMethodID(cl, "getBitmap", "(III)V");
            envClosure->CallStaticVoidMethod(cl,m,target,level,bitmap);
        }).ToLocalChecked()
    ).Check();
    context_local->Global()->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "_external").ToLocalChecked(),
        ext
    ).Check();
}
