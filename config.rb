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
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "blog/{title}.html"
  # Matcher for blog source files
  blog.sources = "blog/{title}.html"
  # blog.taglink = "tags/{tag}.html"
  blog.layout = "layout_blog"
  # blog.summary_separator = /(READMORE)/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

# page "/feed.xml", layout: false

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
  def is_page_selected(page)
    current_page.url == page ? 'class="active"' : ''
  end
end


helpers do
  def current_page?(page)
    current = current_resource.url.gsub('/', ' ').strip
    target = page.gsub('/', ' ').strip

    current == target
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

# helpers do 
#   def link_to_page name, url
#     path = request.path
#     current = false

#     current = url + "/index.html" == path

#     if path == 'index.html' and url =="/"
#       current = true
#     end

#     class_name = current ? ' class="active"' : ''

#     "<li#{class_name}><a href=\"#{url}\">#{name}</a></li>"
#   end
# end


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
  activate :minify_javascript, :inline => true

  # Enable cache buster
  activate :asset_hash

  # Use relative URLs
  activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"

   # Minify HTML on build
  activate :minify_html do |html|
    html.remove_multi_spaces        = true   # Remove multiple spaces
    html.remove_comments            = true   # Remove comments
    html.remove_intertag_spaces     = false  # Remove inter-tag spaces
    html.remove_quotes              = false   # Remove quotes
    html.simple_doctype             = false  # Use simple doctype
    html.remove_script_attributes   = false   # Remove script attributes
    html.remove_style_attributes    = false   # Remove style attributes
    html.remove_link_attributes     = false   # Remove link attributes
    html.remove_form_attributes     = false  # Remove form attributes
    html.remove_input_attributes    = false   # Remove input attributes
    html.remove_javascript_protocol = false   # Remove JS protocol
    html.remove_http_protocol       = false  # Remove HTTP protocol
    html.remove_https_protocol      = false  # Remove HTTPS protocol
    html.preserve_line_breaks       = true  # Preserve line breaks
    html.simple_boolean_attributes  = false   # Use simple boolean attributes
    html.preserve_patterns          = nil    # Patterns to preserve
  end


  # activate :autoprefixer do |config|
  #   config.browsers = ["last 2 versions", "> 10%", "ie 8", "android 2.3"]
  # end


end
