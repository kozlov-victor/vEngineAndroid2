//
// Created by kozlo on 12/6/2023.
//

#ifndef VENGINEANDROID_FUN_HPP
#define VENGINEANDROID_FUN_HPP

#include <string>
#include "../../headers/v8.h"

template <typename T>
T getNumericParameter(const v8::FunctionCallbackInfo<v8::Value>& args, int i) {
    v8::Isolate* isolate = args.GetIsolate();
    if (i < 0 || i >= args.Length()) {
        Logger::error("wrong parameter index",i);
        return T();
    }
    v8::Local<v8::Value> value = args[i];
    if (!value->IsNumber()) {
        Logger::error("not a numeric parameter");
        return T();
    }
    return static_cast<T>(value->ToNumber(isolate->GetCurrentContext()).ToLocalChecked()->Value());
}

struct Fun {
    std::string name;
    void (*value)(const v8::FunctionCallbackInfo<v8::Value>&);
};
#endif //VENGINEANDROID_FUN_HPP
