#include <jni.h>
#include <GLES2/gl2.h>
#include "app/js/Js.h"


Js js;

//extern "C"
//JNIEXPORT void JNICALL
//Java_com_vengine_1android_VEngine_onSurfaceCreated(JNIEnv *env, jclass clazz) {
//    vEngine.initV8();
//}
//extern "C"
//JNIEXPORT void JNICALL
//Java_com_vengine_1android_VEngine_onDrawFrame(JNIEnv *env, jclass clazz) {
//    float r = static_cast <float> (rand()) / static_cast <float> (RAND_MAX);
//    glClearColor(r,0.,1.,1.);
//    glClear(GL_COLOR_BUFFER_BIT);
//}
extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_initV8(JNIEnv *env, jclass clazz) {
    js.initV8(env);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_compileScriptSource(JNIEnv *env, jclass clazz) {
    js.compileScript(env);
}

extern "C"
JNIEXPORT void JNICALL
Java_com_vengine_1android_VEngine_updateFrame(JNIEnv *env, jclass clazz) {
    js.callFunc();
}