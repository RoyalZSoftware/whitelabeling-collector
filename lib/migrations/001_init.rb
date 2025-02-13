require 'active_record'

ActiveRecord::Migration.class_eval do
  create_table :users do |t|
    t.string :name
  end
  create_table :organizations do |t|
    t.string :name
  end
  create_table :provider_invitations do
  end
  create_table :fields
  create_table :validators
  create_table :data_buckets do |t|
    t.string :organization_id
  end
  create_table :submissions do |t|
    t.string :organization_id
    t.string :data_bucket_id
    t.string :user_id
  end
end
