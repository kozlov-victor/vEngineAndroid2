package com.vengine_android.model;

public class BitmapInfo {
    private final int id;
    private final int width;
    private final int height;

    public BitmapInfo(int id, int width, int height) {
        this.id = id;
        this.width = width;
        this.height = height;
    }

    public int getId() {
        return id;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }
}
