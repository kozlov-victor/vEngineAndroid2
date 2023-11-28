#include <jni.h>
#include <GLES2/gl2.h>
#include "app/js/Js.h"
#include "app/logger/Logger.h"

std::string jstring2string(JNIEnv *env, jstring jStr){
    const char *cstr = env->GetStringUTFChars(jStr, nullptr);
    std::string str = std::string(cstr);
    env->ReleaseStringUTFChars(jStr, cstr);
    return str;
}

Js *js;


extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_initV8(JNIEnv *env, jclass clazz) {
    js = new Js();
    js->initV8();
    js->initGlobalObjects(env);
}


extern "C"
JNIEXPORT jobject JNICALL
Java_com_vengine_1android_VEngine_compileScript(JNIEnv *env, jclass clazz, jstring file_name,
                                                jstring source) {

    JsCompilationResult result =
            js->compileScript(
                    jstring2string(env,file_name).c_str(),
                    jstring2string(env,source).c_str()
            );
    jclass cl = env->FindClass("com/vengine_android/JsCompilationResult");
    jmethodID cid = env->GetMethodID(cl, "<init>", "(ZLjava/lang/String;)V");
    return env->NewObject(cl, cid, result.success,env->NewStringUTF(result.error.c_str()));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_updateFrame(JNIEnv *env, jclass clazz) {
    v8::Local<v8::Value> args[] = {};
    js->callFunc("_requestAnimationFrameGlobalCallBack",0,args);
}
extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_dispose(JNIEnv *env, jclass clazz) {
    delete js;
    js = nullptr;
}