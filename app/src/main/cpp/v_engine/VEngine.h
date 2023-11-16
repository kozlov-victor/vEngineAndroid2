//
// Created by kozlo on 11/16/2023.
//

#ifndef VENGINEANDROID_VENGINE_H
#define VENGINEANDROID_VENGINE_H

#include <string>
#include <jni.h>

class VEngine {

private:
    static void log(int level, const std::string& message);

public:

    static void log_info(const std::string& message);

    static void log_warn(const std::string& message);

    void initV8();
    jstring getStr(JNIEnv *env);
};


#endif //VENGINEANDROID_VENGINE_H
