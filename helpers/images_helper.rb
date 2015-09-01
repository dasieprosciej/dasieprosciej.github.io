module ImagesHelper
  def imgpath(relative_path)
    if $current_listed_article.nil?
      # On page
      url = current_page.url
    else
      # In listing
      url = $current_listed_article.url
    end

    "#{url}images/#{relative_path}"  # return
  end   

  # def img(relative_path, alt=nil)
  #   if $current_listed_article.nil?
  #     # On page
  #     url = current_page.url
  #   else
  #     # In listing
  #     url = $current_listed_article.url
  #   end
  #   alt ? alt_attr = "alt='#{alt}' " : alt_attr = ''

  #   "<img #{alt_attr} src='#{url}images/#{relative_path}'>"  # return
  # end   

  def img(url, options={})
    options.reverse_merge!(:src => imgpath(url))
    tag(:img, options)
  end

  def dataimg(url, options={})
    options.reverse_merge!(:data => {:src => imgpath(url)})
    tag(:img, options)
  end

  def bgimg(url, options={}, &block)

    options.reverse_merge!('data-background-image' => imgpath(url), :class => 'bg-img')
    content = block_given? ? capture(&block) : ''
    content_tag :section, content, options
    # content_tag = tag(:section, options, capture(&block))
    # content
    # capture(&block)

    # "data-background-image='" + imgpath(url) + "'"
  end

  # Acts as a thin wrapper for image_tag and generates an srcset attribute for regular image tags
  # for usage with responsive images polyfills like picturefill.js, supports asset pipeline path helpers.
  #
  # image_set_tag 'pic_1980.jpg', { 'pic_640.jpg' => '640w', 'pic_1024.jpg' => '1024w', 'pic_1980.jpg' => '1980w' }, sizes: '100vw', class: 'my-image'
  # 
  # => <img src="/assets/ants_1980.jpg" srcset="/assets/pic_640.jpg 640w, /assets/pic_1024.jpg 1024w, /assets/pic_1980.jpg 1980w" sizes="100vw" class="my-image">
  #
  def image_set_tag(source, srcset = {}, options = {})
    srcset = srcset.map { |src, size| "#{imgpath(src)} #{size}" }.join(', ')
    image_tag(imgpath(source), options.merge(srcset: srcset))
  end


  def figure(content_url, caption=nil, options={})
      content = img(content_url, options)

    if caption
      content += content_tag(:figcaption, caption)
    end  
    content_tag :figure, content
  end

  def figure(type, content_url, caption=nil, options={})
    if !(type == :s || type == :m || type == :l || type == :xl || type== :responsive) && options[:type].blank?
      raise ArgumentError.new("You should pass :type option key explicitly, because you have passed #{type} type other than :s, :m, :l, :xl or :responsive.")
    end

    case type
    when :s
      suffix = '-s'
    when :m 
      suffix = '-m'
    when :l 
      suffix = '-l'
    when :xl
      suffix = '-xl'
    when :responsive
       suffix = ''
    end
    
    basename = File.basename(content_url, '.*')
    ext = File.extname(content_url)

    real_path = content_url.sub(basename + ext,basename + suffix + ext )
    # real_path = File.join(images_dir, real_path) unless real_path.start_with?('/')
    # full_path = File.join(source_dir, real_path)

    if type == :responsive
      content = dataimg(content_url, options) 
      # dataimg z gory
    else        
      content = img(real_path, options)
    end  

    if caption
      content += content_tag(:figcaption, caption)
    end  
    content_tag :figure, content
  end

  # def figure_tag(content_type, content_urls=[], caption, options={})
  #   case content_type
  #   when :image
  #     content = image_tag(content_urls.first, srcset: content_urls.join(','), alt: options[:alt])
  #   when :video
  #     content = video_tag(content_urls.first, alt: options[:alt], controls: true)
  #   end 
  #   content += content_tag(:figcaption, caption)
  #   content_tag :figure, content
  # end
      # def get_size(name)
      #   main_abs_path = File.join(app.source_dir,name)
      #   FastImage.size(main_abs_path, :raise_on_failure => true)
      # end
end