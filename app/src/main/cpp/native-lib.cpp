#include <jni.h>
#include <GLES2/gl2.h>
#include "v_engine/VEngine.h"


VEngine vEngine;

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_onSurfaceCreated(JNIEnv *env, jclass clazz) {
    vEngine.initV8();
}
extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_onDrawFrame(JNIEnv *env, jclass clazz) {
    float r = static_cast <float> (rand()) / static_cast <float> (RAND_MAX);
    glClearColor(r,0.,1.,1.);
    glClear(GL_COLOR_BUFFER_BIT);
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_vengine_1android_VEngine_getTestString(JNIEnv *env, jclass clazz) {
    return vEngine.getStr(env);
}