package ir.sanatisharif.android.konkur96;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

import android.animation.Animator;
import android.content.Intent;
import android.os.Bundle;
import android.view.Window;
import android.view.WindowManager;

import com.airbnb.lottie.LottieAnimationView;

public class SplashScreenActivity extends AppCompatActivity {

    private LottieAnimationView lottieAnimationView ;
    

  /*
   * the isShownOnce boolean is for when user started the app
   * and seen the splash screen launcher then after searching
   * in app wants to exit the app not going back to splash again!
   *  */

    private boolean isShownOnce = false ;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash_screen);
        init();
    }

    private void init(){

      //setStatusBarColor();
      setTransparentFullScreen();
      startMainActivity();

    }

    private void startMainActivity(){


      lottieAnimationView = findViewById(R.id.splash_alaa);

      lottieAnimationView.addAnimatorListener(new Animator.AnimatorListener() {
        @Override
        public void onAnimationStart(@NonNull Animator animation) {

        }

        @Override
        public void onAnimationEnd(@NonNull Animator animation) {

          isShownOnce = true ;
          Intent intent = new Intent(SplashScreenActivity.this , MainActivity.class);
          startActivity(intent);
        }

        @Override
        public void onAnimationCancel(@NonNull Animator animation) {

        }

        @Override
        public void onAnimationRepeat(@NonNull Animator animation) {

        }
      });


    }

    private void setStatusBarColor(){
      Window window = getWindow();

      // clear FLAG_TRANSLUCENT_STATUS flag:
      window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);

      // add FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS flag to the window
      window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);


      // finally change the color
      window.setStatusBarColor(ContextCompat.getColor(this,R.color.alaaPrimary));
    }

    private void setTransparentFullScreen(){

      Window w = getWindow();
      w.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);

    }


  @Override
  protected void onResume() {
    super.onResume();
    if (isShownOnce){
      finish();
      System.exit(0);
    }
  }



}
