package com.vengine_android;

public class JsCompilationResult {
    private final boolean success;
    private final String error;

    public JsCompilationResult(boolean success, String error) {
        this.success = success;
        this.error = error;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getError() {
        return error;
    }
}
