module Readingtime
  #TODO: move this to a configuration object
  def self.reading_speed
    200
  end

  def self.hms(secs)
    h, m, s = 0, 0, 0
    h = secs / 3600
    secs -= h * 3600
    m = secs / 60
    secs -= m * 60
    [h, m, secs]
  end

  def self.minutes_in_seconds(words)
    (words / self.reading_speed).floor * 60
  end

  def self.seconds(words)
    (words % self.reading_speed / (self.reading_speed / 60)).floor
  end

  # TODO: Account for HH:MM:00
  def self.format_seconds(seconds)
    '%02d:%02d' % seconds.divmod(60)
  end

  def self.format_words(seconds)
    if seconds >= 60
      '%d minutes and %d seconds' % seconds.divmod(60)
    else
      "#{ seconds } seconds"
    end
    
  end

  def self.format_approx(seconds)
    if seconds > 59
      '%d minutes' % (seconds.to_f/60).round
    else 
      '%d seconds' % seconds
    end
  end

  def self.format_full(hms)
    r, h, m, s = [], hms[0], hms[1], hms[2]
    r << "#{h} #{h == 1 ? 'hr' : 'hrs'}" if h > 0
    r << "#{m} #{m == 1 ? 'min' : 'mins'}" if m > 0
    r << "#{s} #{s == 1 ? 'sec' : 'secs'}" if s > 0
    r.join(" ")
  end




  def reading_timee(options = {})
    format_options = options[:format] || :basic

    word_size = self.calculate_size
    minutes = Readingtime.minutes_in_seconds(word_size)
    seconds = Readingtime.seconds(word_size)

    case format_options
    when :basic
      Readingtime.format_seconds((minutes + seconds))
    when :long
      Readingtime.format_words((minutes + seconds))
    when :approx
      Readingtime.format_approx((minutes + seconds))
    when :full
      hms = Readingtime.hms(minutes + seconds)
      Readingtime.format_full(hms)
    when :raw
      Readingtime.hms(minutes + seconds)
    end

  end

  def calculate_size
    self.scan(/(\w|-)+/).size
  end

end