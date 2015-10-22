###
# Compass
###

require 'slim'


# set :markdown_engine, :kramdown
# set :markdown,    :auto_ids => false,
#                   :parse_block_html => false,
#                   :layout_engine => :haml

###
# Markdown
###
set :haml, { :ugly => true, :format => :html5 }

class CustomMarkdown < Middleman::Extension
  $markdown_options = {
    autolink: true,
    fenced_code_blocks: true,
    disable_indented_code_blocks: true,
    no_intra_emphasis: true,
    strikethrough: true,
    tables: true,
    hard_wrap: true,
    with_toc_data: false
  }

  def initialize(app, options_hash={}, &block)
    super
    app.set :markdown_engine, :redcarpet
    app.set :markdown, $markdown_options
  end

  module Haml::Filters
    remove_filter("Markdown")

    module Markdown
      include Haml::Filters::Base

      def render text
        markdown.render text
      end

      class MarkdownRenderer < Redcarpet::Render::HTML
        def block_code(code, language)
          Middleman::Syntax::Highlighter.highlight(code.force_encoding("UTF-8"), language)
        end
      end

      private

      def markdown
        @markdown ||= Redcarpet::Markdown.new MarkdownRenderer.new($markdown_options), $markdown_options
      end
    end
  end
end

::Middleman::Extensions.register(:custom_markdown, CustomMarkdown)

activate :custom_markdown
activate :syntax, :line_numbers => false


########

#  nie zmieniac, host do produkcji jest ponizej, ten sluzy mi do fastimage
@site = "http://localhost:4567"
set :var, @site

set :root, "http://dasieprosciej.pl"


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
  blog.name = "blog"
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
  blog.custom_collections = {
    author: {
      link: '/blog/autorzy/{author}.html',
      template: '/templates/authors.html'
    }
  }
  # blog.tag_template = "tag.html"
  # blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  # blog.per_page = 10
  # blog.page_link = "page/{num}"
end

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "projekty"
  blog.name = "projekty"
  blog.permalink = "projekty/{title}.html"
  # Matcher for blog source files
  blog.sources = "projekty/{title}.html"
  blog.layout = "projekt"

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

  def smart_truncate(s, opts = {})
    opts = {:words => 12}.merge(opts)
    if opts[:sentences]
      return s.split(/\.(\s|$)+/)[0, opts[:sentences]].map{|s| s.strip}.join('. ') + '.'
    end
    a = s.split(/\s/) # or /[ ]+/ to only split on spaces
    n = opts[:words]
    a[0...n].join(' ') + (a.size > n ? '...' : '')
  end
  
  def embed(youtube_url)
    youtube_id = youtube_url.split("=").last
    # %Q{<iframe title="YouTube video player" width="240" height="390" src="http://www.youtube.com/embed/#{ youtube_id }" frameborder="0" allowfullscreen></iframe>}
    content_tag(:div, content_tag(:iframe, nil,  allowfullscreen:true , src: "//www.youtube.com/embed/#{youtube_id}"), :class => "embed-container")

    # content_tag :div, :class => "embed-container" do
    #   content_tag(:iframe, nil,  src: "//www.youtube.com/embed/#{youtube_id}")
    # end
  end  

  def vimeo(vimeo_url)
    vimeo_id = vimeo_url.split("/").last
    content_tag(:div, content_tag(:iframe, nil, src: "//player.vimeo.com/video/#{vimeo_id}"), :class => "embed-container")
  end  

  def reading_time_eng(input)
    words_per_minute = 200
    words = input.split.size
    minutes = (words/words_per_minute).floor
    minutes_label = minutes === 1 ? ' minute' : ' minutes'
    minutes > 0 ? "about #{minutes} #{minutes_label}" : 'less than 1 minute'
  end

  def reading_time(input)
    words_per_minute = 180
    words = input.split.size
    minutes = (words/words_per_minute).floor
    minutes_label = minutes === 1 ? ' min.' : ' min.'
    minutes > 0 ? "około #{minutes} #{minutes_label}" : 'mniej niż 1 min.'
  end

  def time_ago_in_words(from_time, options = {})
        distance_of_time_in_words(from_time, Time.now, options)
  end

  def br()
      content_tag(:p, "<br>", :class => "p--empty")
  end


end



# helpers do
#   def current_page?(page)
#     current = current_resource.url.gsub('/', ' ').strip
#     target = page.gsub('/', ' ').strip

#     current == target
#   end
# end


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

  # ignore 'projekty.html.erb'
  # ignore 'blog.html.erb'
  # ignore 'blog2.html.erb'
  # ignore 'blog/*'


  # Minify Javascript on build
  activate :minify_javascript, :inline => true

  # activate :imageoptim do |options|
  #   # Use a build manifest to prevent re-compressing images between builds
  #   options.manifest = true

  #   # Silence problematic image_optim workers
  #   options.skip_missing_workers = true

  #   # Cause image_optim to be in shouty-mode
  #   options.verbose = false

  #   # Setting these to true or nil will let options determine them (recommended)
  #   options.nice = true
  #   options.threads = true

  #   # Image extensions to attempt to compress
  #   options.image_extensions = %w(.png .jpg .gif .svg)

  #   options.allow_lossy = true

  #   # Compressor worker options, individual optimisers can be disabled by passing
  #   # false instead of a hash
  #   options.advpng    = { :level => 4 }
  #   options.gifsicle  = { :interlace => false }
  #   options.jpegoptim = { :strip => ['all'], :max_quality => 100 }
  #   options.jpegtran  = { :copy_chunks => false, :progressive => true, :jpegrescan => true }
  #   options.optipng   = { :level => 6, :interlace => false }
  #   options.pngcrush  = { :chunks => ['alla'], :fix => false, :brute => false }
  #   options.pngout    = false
  #   options.svgo      = false
  # end

  # Enable cache buster
  activate :asset_hash, :ignore => %r{^images/favicon/.*}, :ignore => [/^projekty/, /^blog/]

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
