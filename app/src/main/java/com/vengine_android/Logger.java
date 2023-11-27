package com.vengine_android;

import android.util.Log;

public class Logger {
    public static void info(String msg) {
        Log.i("vEngine",msg);
    }

    public static void debug(String msg) {
        Log.d("vEngine",msg);
    }

    public static void error(String msg) {
        Log.e("vEngine",msg);
    }

    public static void warn(String msg) {
        Log.w("vEngine",msg);
    }

}
