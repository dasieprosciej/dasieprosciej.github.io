###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

# Combine media queries at bottom of document
# require 'sass-media_query_combiner' (zly porzadek, wracam do gulpa)

activate :deploy do |deploy|
  deploy.method = :git
  deploy.branch = 'master'
end

activate :blog do |blog|
  # set options on blog
end

activate :directory_indexes
###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

helpers do
  def is_page_active(page)
    current_page.url == page ? {:class => 'is-active'} : {}
  end
end

# nie dziala z pretty urls
# helpers do   
#   def link_to_page name, url
#      path = request.path
#      class_name = (path == url) ? ' class="active"' : ''
#      "<li#{class_name}><a href=\"#{url}\">#{name}</a></li>"
#   end
# end 

helpers do 
  def link_to_page name, url
    path = request.path
    current = false

    current = url + "/index.html" == path

    if path == 'index.html' and url =="/"
      current = true
    end

    class_name = current ? ' class="active"' : ''

    "<li#{class_name}><a href=\"#{url}\">#{name}</a></li>"
  end
end
# Proxy pages (https://middlemanapp.com/advanced/dynamic_pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'css'

set :js_dir, 'js'

set :images_dir, 'images'

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

   # autoprefixer
  # activate :autoprefixer do |config|
  #   config.browsers = ["last 2 versions", "> 10%", "ie 8", "android 2.3"]
  # end


end
