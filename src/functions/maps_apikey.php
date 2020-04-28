<?php

add_filter('acf/settings/google_api_key', function ($value) {
  return 'API_KEY';
});
