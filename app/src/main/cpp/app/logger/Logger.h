//
// Created by kozlo on 11/18/2023.
//

#ifndef VENGINEANDROID_LOGGER_H
#define VENGINEANDROID_LOGGER_H


#include <string>
#include <android/log.h>
#include <sstream>

class Logger {

public:
    static const int LEVEL_DEBUG = ANDROID_LOG_DEBUG;
    static const int LEVEL_INFO = ANDROID_LOG_INFO;
    static const int LEVEL_WARN = ANDROID_LOG_WARN;
    static const int LEVEL_ERROR = ANDROID_LOG_ERROR;

    void static log(int level, const std::string& message);
    void static debug(const std::string &message);
    void static info(const std::string &message);
    void static warn(const std::string &message);
    void static error(const std::string &message);

    void static debug(const std::string &message, int val);
    void static info(const std::string &message, int val);
    void static warn(const std::string &message, int val);
    void static error(const std::string &message, int val);

};


#endif //VENGINEANDROID_LOGGER_H
