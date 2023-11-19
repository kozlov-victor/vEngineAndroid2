//
// Created by kozlo on 11/19/2023.
//

#include "JsCompilationResult.h"
#include <string>

JsCompilationResult::JsCompilationResult(bool success, std::string error) {
    this->success = success;
    this->error = std::move(error);
}
