//
// Created by kozlo on 11/27/2023.
//

#ifndef VENGINEANDROID_EXTERNALFUNCTIONS_H
#define VENGINEANDROID_EXTERNALFUNCTIONS_H


#include "../../headers/v8.h"

class ExternalFunctions {
public:
    static void create(JNIEnv *env,v8::Isolate *isolate,v8::Local<v8::Context> &context_local);
};


#endif //VENGINEANDROID_EXTERNALFUNCTIONS_H
