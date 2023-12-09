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
      std::unique_ptr<v8::Platform> platform;
      v8::Isolate *isolate;
      v8::Persistent<v8::Context> *persistentContext;
      v8::ArrayBuffer::Allocator *allocator;

      Js();
      ~Js();
      void initV8();
      void initGlobalObjects(JNIEnv *env) const;
      JsCompilationResult compileScript(const char* fileName, const char* code) const;
      void callFunc(const char *funcname,const int argc,v8::Handle<v8::Value> argv[]) const;
      void onResize(int width, int height) const;
};


#endif //VENGINEANDROID_JS_H
