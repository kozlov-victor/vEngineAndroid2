//
// Created by kozlo on 11/18/2023.
//

#ifndef VENGINEANDROID_CONSOLE_H
#define VENGINEANDROID_CONSOLE_H


#include "../../headers/v8.h"

class Console {

public:
    static void create(v8::Local<v8::Context> &context_local);
};


#endif //VENGINEANDROID_CONSOLE_H
