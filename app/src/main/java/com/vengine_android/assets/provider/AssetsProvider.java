package com.vengine_android.assets.provider;

import android.graphics.Bitmap;

import java.nio.ByteBuffer;

public interface AssetsProvider {
    Bitmap loadBitmap(String fileName);
    String loadString(String fileName);
    ByteBuffer loadBinary(String fileName);
}
