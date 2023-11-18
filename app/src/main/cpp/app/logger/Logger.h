//
// Created by kozlo on 11/18/2023.
//

#ifndef VENGINEANDROID_LOGGER_H
#define VENGINEANDROID_LOGGER_H


#include <string>

class Logger {

private:
    void static log(int level, const std::string& message);

public:
    void static debug(const std::string &message);
    void static info(const std::string &message);
    void static warn(const std::string &message);
    void static error(const std::string &message);

};


#endif //VENGINEANDROID_LOGGER_H
