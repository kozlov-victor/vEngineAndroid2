//
// Created by kozlo on 12/6/2023.
//

#ifndef VENGINEANDROID_FUN_HPP
#define VENGINEANDROID_FUN_HPP

#include <string>
#include "../../headers/v8.h"

struct Fun {
    std::string name;
    void (*value)(const v8::FunctionCallbackInfo<v8::Value>&);
};
#endif //VENGINEANDROID_FUN_HPP
