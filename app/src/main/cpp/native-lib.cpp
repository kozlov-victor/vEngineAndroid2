#include <jni.h>
#include "v_engine/VEngine.h"


VEngine vEngine;

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_MainActivity_initV8(JNIEnv *env, jobject thiz) {
    vEngine.initV8();
}
extern "C"
JNIEXPORT jstring JNICALL
Java_com_vengine_1android_MainActivity_stringFromV8(JNIEnv *env, jobject thiz) {
    return vEngine.getStr(env);
}