//
// Created by kozlo on 11/27/2023.
//

#include <jni.h>
#include "ExternalFunctions.h"
#include "app/logger/Logger.h"

JNIEnv *envClosure;

void ExternalFunctions::create(JNIEnv *env,v8::Isolate *isolate, v8::Local<v8::Context> &context_local) {
    v8::Local<v8::Object> ext = v8::Object::New(isolate);
    envClosure = env;
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "setSurfaceWidth").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            int width = args[0]->ToInteger(args.GetIsolate()->GetCurrentContext()).ToLocalChecked()->Value();
            jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
            jmethodID cid = envClosure->GetStaticMethodID(cl, "setSurfaceWidth", "(I)V");
            envClosure->CallStaticVoidMethod(cl, cid, width);
        }).ToLocalChecked()
    );
    ext->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "getSurfaceWidth").ToLocalChecked(),
            v8::Function::New(context_local, [](auto args){
                jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
                jmethodID cid = envClosure->GetStaticMethodID(cl, "getSurfaceWidth", "()I");
                jint width = envClosure->CallStaticIntMethod(cl, cid);
                args.GetReturnValue().Set(width);
            }).ToLocalChecked()
    );
    ext->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "setSurfaceHeight").ToLocalChecked(),
            v8::Function::New(context_local, [](auto args){
                int height = args[0]->ToInteger(args.GetIsolate()->GetCurrentContext()).ToLocalChecked()->Value();
                jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
                jmethodID cid = envClosure->GetStaticMethodID(cl, "setSurfaceHeight", "(I)V");
                envClosure->CallStaticVoidMethod(cl, cid, height);
            }).ToLocalChecked()
    );
    ext->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "getSurfaceHeight").ToLocalChecked(),
            v8::Function::New(context_local, [](auto args){
                jclass cl = envClosure->FindClass("com/vengine_android/engine/VEngine");
                jmethodID cid = envClosure->GetStaticMethodID(cl, "getSurfaceHeight", "()I");
                jint height = envClosure->CallStaticIntMethod(cl, cid);
                args.GetReturnValue().Set(height);
            }).ToLocalChecked()
    );

    context_local->Global()->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "_external").ToLocalChecked(),
            ext
    );
}
