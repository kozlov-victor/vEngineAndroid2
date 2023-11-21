#include <jni.h>
#include <GLES2/gl2.h>
#include "app/js/Js.h"


v8::Local<v8::Value> emptyArray[] = { };
Js js;

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_initV8(JNIEnv *env, jclass clazz) {
    js.initV8(env);
}

extern "C"
JNIEXPORT jobject JNICALL
Java_com_vengine_1android_VEngine_compileScriptSource(JNIEnv *env, jclass clazz) {
    JsCompilationResult result = js.compileScript(env);
    jclass cl = env->FindClass("com/vengine_android/JsCompilationResult");
    jmethodID cid = env->GetMethodID(cl, "<init>", "(ZLjava/lang/String;)V");
    return env->NewObject(cl, cid, result.success,env->NewStringUTF(result.error.c_str()));
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_updateFrame(JNIEnv *env, jclass clazz) {
    js.callFunc("_requestAnimationFrameGlobalCallBack",0,emptyArray);
}
extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_dispose(JNIEnv *env, jclass clazz) {
    js.dispose();
}