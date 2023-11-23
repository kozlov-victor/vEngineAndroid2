//
// Created by kozlo on 11/18/2023.
//

#ifndef VENGINEANDROID_JS_H
#define VENGINEANDROID_JS_H

#include <string>
#include "headers/libplatform/libplatform.h"
#include "headers/v8.h"
#include "app/js_compilation_result/JsCompilationResult.h"

class Js {

public:
    /* the following references need to be around somewhere,
     * either as global (not recommended), or in some object,
     * otherwise they'll get garbage collected by C++
     * and cause a segmentation fault crash
     */
      std::unique_ptr<v8::Platform> platform;
      v8::Isolate *isolate{};
      v8::Persistent<v8::Context> persistentContext;

    Js();
    void initV8();
    JsCompilationResult compileScript(const char* fileName, const char* code);
    void callFunc(const char *funcname,const int argc,v8::Handle<v8::Value> argv[]);
    void dispose();
};


#endif //VENGINEANDROID_JS_H
