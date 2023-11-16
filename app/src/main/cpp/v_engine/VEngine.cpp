//
// Created by kozlo on 11/16/2023.
//
#include <android/log.h>
#include <string>
#include "VEngine.h"


void VEngine::log(int level, const std::string& message) {
    __android_log_print(level, "vEngine", "%s", message.c_str());
}

void VEngine::log_info(const std::string& message) {
    log(ANDROID_LOG_INFO, message);
}

void VEngine::log_warn(const std::string& message) {
    log(ANDROID_LOG_WARN, message);
}

void VEngine::initV8() {
    log_info("init v8 from class");
}
