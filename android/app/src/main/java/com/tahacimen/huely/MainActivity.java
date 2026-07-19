package com.tahacimen.huely;

import android.os.Bundle;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        applyDarkSystemBars();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        // Capacitor and the splash-screen transition set up the window after
        // onCreate and reset the bar appearance, so re-assert it on focus.
        if (hasFocus) applyDarkSystemBars();
    }

    /**
     * The game is dark-only. targetSdk 36 enforces edge-to-edge, where the theme's
     * windowLightStatusBar is unreliable, so drive the system-bar icon appearance
     * directly: light icons, legible against the dark artwork.
     */
    private void applyDarkSystemBars() {
        WindowInsetsControllerCompat controller =
            WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        controller.setAppearanceLightStatusBars(false);
        controller.setAppearanceLightNavigationBars(false);
    }
}
