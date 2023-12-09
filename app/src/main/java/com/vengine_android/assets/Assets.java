package com.vengine_android.assets;

import android.graphics.Bitmap;

import com.vengine_android.assets.provider.AssetsProvider;
import com.vengine_android.assets.provider.LocalAssetsProvider;
import com.vengine_android.assets.provider.RemoteAssetsProvider;
import com.vengine_android.model.BitmapInfo;

import java.nio.ByteBuffer;
import java.util.HashMap;
import java.util.Map;

public class Assets {

    private final Map<Integer,Bitmap> bitmapCache = new HashMap<>();
    private final LocalAssetsProvider localAssetsProvider = new LocalAssetsProvider();
    private final RemoteAssetsProvider remoteAssetsProvider = new RemoteAssetsProvider();

    private AssetsProvider resolveProvider() {
        if (remoteAssetsProvider.isEnabled()) return remoteAssetsProvider;
        else return localAssetsProvider;
    }

    public void setRemoteBaseUrl(String remoteBaseUrl) {
        remoteAssetsProvider.setRemoteBaseUrl(remoteBaseUrl);
    }

    public BitmapInfo loadBitmap(String fileName) {
        Bitmap bitmap = resolveProvider().loadBitmap(fileName);
        if (bitmap==null) return new BitmapInfo(0,0,0);
        int key = bitmapCache.size() + 1;
        bitmapCache.put(key,bitmap);
        return new BitmapInfo(key,bitmap.getWidth(),bitmap.getHeight());
    }

    public String loadString(String fileName) {
        return resolveProvider().loadString(fileName);
    }

    public ByteBuffer loadBinary(String fileName) {
        return resolveProvider().loadBinary(fileName);
    }

    public String loadStringFromLocalAsset(String fileName) {
        return localAssetsProvider.loadString(fileName);
    }

    public Bitmap getCachedBitmap(int id) {
        return bitmapCache.get(id);
    }



}
