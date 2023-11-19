//
// Created by kozlo on 11/19/2023.
//

#ifndef VENGINEANDROID_JSCOMPILATIONRESULT_H
#define VENGINEANDROID_JSCOMPILATIONRESULT_H
#include <string>

class JsCompilationResult {

public:
    bool success;
    std::string error;

    JsCompilationResult(bool success, std::string error);

};


#endif //VENGINEANDROID_JSCOMPILATIONRESULT_H
