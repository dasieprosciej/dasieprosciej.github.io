
module ImagesHelper


  # uzywane do img
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

  # uzywane do figure
  def img(url, options={})
    options.reverse_merge!(:src => imgpath(url))
    tag(:img, options)
  end

# uzywane do bg figure responsive
  def dataimg(url, options={})
    options.reverse_merge!(:data => {:src => imgpath(url)})
    tag(:img, options)
  end


# jako bg image inline w postaci sekcji
  def bgimg(url, options={}, &block)
    options.reverse_merge!('data-background-image' => imgpath(url))
    content = block_given? ? capture(&block) : ''
    content_tag :section, content, options
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


  # def figure(content_url, caption=nil, options={})
  #     content = img(content_url, options)

  #   if caption
  #     content += content_tag(:figcaption, caption)
  #   end  
  #   content_tag :figure, content
  # end

  def figure(type, content_url, caption=nil, alt=nil, opts={})
    if !(type == :s || type == :m || type == :l || type == :xl || type== :responsive || type== :thumb) && opts[:type].blank?
      raise ArgumentError.new("You should pass :type option key explicitly, because you have passed #{type} type other than :s, :m, :l, :xl or :responsive.")
    end

    case type
    when :thumb
      suffix = '-thumbnail'  
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

    if type == :responsive
      content = content_tag :img ,nil, 'data-src' => imgpath(real_path), :alt => alt
    else        
      content = content_tag :img ,nil, :src => imgpath(real_path), :alt => alt
    end  

    if caption
      content += content_tag(:figcaption, caption)  
    end  

    content_tag :figure, opts do 
      content
    end
  end



# figure with aspect ratio
  def figure_r(type, content_url, caption=nil, alt=nil, options={})
    if !(type == :s || type == :m || type == :l || type == :xl || type== :responsive || type== :thumb)  && options[:type].blank?
      raise ArgumentError.new("You should pass :type option key explicitly, because you have passed #{type} type other than :s, :m, :l, :xl or :responsive.")
    end

    case type
    when :thumb
      suffix = '-thumbnail'
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
    

    # if type == :responsive
    #   content = dataimg(content_url) 
    #   # dataimg z gory
    #   else        
    #   content = img(real_path)
    # end  

    if type == :responsive
      content = content_tag :img ,nil, 'data-src' => imgpath(real_path), :alt => alt
    else        
      content = content_tag :img ,nil, :src => imgpath(real_path), :alt => alt
    end      


    suffixed_path = imgpath(real_path)

    # dla responsive bedziemy badac tylko wielkosc 's' stad musze nowy path stworzyc
    suffix_s = '-s'
    real_path_s = content_url.sub(basename + ext,basename + suffix_s + ext )
    suffixed_path_responsive = imgpath(real_path_s)

    if type == :responsive
        width, height = FastImage.size(@site + suffixed_path_responsive, :raise_on_failure => true)
      else
        width, height = FastImage.size(@site + suffixed_path, :raise_on_failure => true)    
    end  
    
    aspect_ratio = number_to_percentage(height.to_f / width * 100, precision: 4)


    if caption
      content_tag :figure, options do  
          content_tag(:span, content, :class => "aspect-ratio", :style => "padding-bottom: #{aspect_ratio}") +
          content_tag(:figcaption, caption)
      end  
    else
      content_tag :figure, options do  
          content_tag(:span, content, :class => "aspect-ratio", :style => "padding-bottom: #{aspect_ratio}")
      end  
    end
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