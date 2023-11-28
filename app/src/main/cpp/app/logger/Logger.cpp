//
// Created by kozlo on 11/18/2023.
//

#include "Logger.h"
#include <android/log.h>

void Logger::log(int level, const std::string &message) {
    __android_log_print(level, "vEngine", "%s", message.c_str());
}

void Logger::debug(const std::string &message) {
    log(LEVEL_DEBUG, message);
}

void Logger::info(const std::string &message) {
    log(LEVEL_INFO, message);
}

void Logger::warn(const std::string &message) {
    log(LEVEL_WARN, message);
}

void Logger::error(const std::string &message) {
    log(LEVEL_ERROR, message);
}

void Logger::debug(const std::string &message, int val) {
    debug(message + " " + std::to_string(val));
}

void Logger::info(const std::string &message, int val) {
    info(message + " " + std::to_string(val));
}

void Logger::warn(const std::string &message, int val) {
    warn(message + " " + std::to_string(val));
}

void Logger::error(const std::string &message, int val) {
    error(message + " " + std::to_string(val));
}
