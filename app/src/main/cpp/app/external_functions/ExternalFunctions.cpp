//
// Created by kozlo on 11/27/2023.
//

#include <jni.h>
#include "ExternalFunctions.h"

JNIEnv *envClosure;

void ExternalFunctions::create(JNIEnv *env,v8::Isolate *isolate, v8::Local<v8::Context> &context_local) {
    v8::Local<v8::Object> ext = v8::Object::New(isolate);
    envClosure = env;
    ext->Set(
        context_local,
        v8::String::NewFromUtf8(isolate, "changeSurfaceWidth").ToLocalChecked(),
        v8::Function::New(context_local, [](auto args){
            int width = args[0]->ToInteger(args.GetIsolate()->GetCurrentContext()).ToLocalChecked()->Value();
            jclass cl = envClosure->FindClass("com/vengine_android/VEngine");
            jmethodID cid = envClosure->GetStaticMethodID(cl, "onSurfaceWidthChanged", "(I)V");
            envClosure->CallStaticVoidMethod(cl, cid, width);
        }).ToLocalChecked()
    );
    ext->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "changeSurfaceHeight").ToLocalChecked(),
            v8::Function::New(context_local, [](auto args){
                int height = args[0]->ToInteger(args.GetIsolate()->GetCurrentContext()).ToLocalChecked()->Value();
                jclass cl = envClosure->FindClass("com/vengine_android/VEngine");
                jmethodID cid = envClosure->GetStaticMethodID(cl, "onSurfaceHeightChanged", "(I)V");
                envClosure->CallStaticVoidMethod(cl, cid, height);
            }).ToLocalChecked()
    );

    context_local->Global()->Set(
            context_local,
            v8::String::NewFromUtf8(isolate, "_external").ToLocalChecked(),
            ext
    );
}
