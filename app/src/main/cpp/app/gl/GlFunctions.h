//
// Created by kozlo on 11/19/2023.
//

#ifndef VENGINEANDROID_GLFUNCTIONS_H
#define VENGINEANDROID_GLFUNCTIONS_H


#include "../../headers/v8.h"

class GlFunctions {
public:
    static void create(v8::Isolate *isolate,v8::Local<v8::Context> &context_local,v8::Local<v8::Object> &gl);
};


#endif //VENGINEANDROID_GLFUNCTIONS_H
