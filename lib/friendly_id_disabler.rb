module FriendlyId
  module Disabler
    THREAD_LOCAL_KEY = :__friendly_id_enabler_disabled

    class << self
      def disabled?
        !Thread.current[THREAD_LOCAL_KEY].nil?
      end

      def disable_friendly_id
        old_value = Thread.current[THREAD_LOCAL_KEY]
        Thread.current[THREAD_LOCAL_KEY] = true
        yield
      ensure
        Thread.current[THREAD_LOCAL_KEY] = old_value
      end
    end
  end
end
