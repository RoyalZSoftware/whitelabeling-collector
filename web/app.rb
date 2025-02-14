require_relative '../lib/whitelabeling_collector.rb';
require 'active_record'
require 'json'
require 'sinatra'
require "sinatra/cross_origin"

ActiveRecord::Base.establish_connection(adapter: 'sqlite3', database: 'Test.sqlite3')

set :allow_origin, :any
set :allow_methods, [:get, :post, :options]
set :allow_credentials, true
set :max_age, "1728000"
set :expose_headers, ['Content-Type']

configure do
  enable :cross_origin
end

options "*" do
  response.headers["Allow"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"

  response.headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Cache-Control, Accept"

  200
end


before '*' do
  content_type :json
end

def validate_user_is_organization_admin
  if params[:organization_id] == "69"
    halt 401
  end
  # todo
end

get '/organizations/:organization_id/data_buckets' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.where(organization_id: params[:organization_id]).to_json
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.find(params[:data_bucket_id]).to_json
end

def json_body
  JSON.parse request.body.read
end

get '/organizations' do
  WhitelabelingCollector::Lib::Organization.all().to_json
end

# Create a new organization. Should be limited to X
post '/organizations' do
  WhitelabelingCollector::Lib::Organization.create(name: json_body['name']).to_json
end

post '/upload' do
# maybe wrong to have a generic upload route.
end

post '/organizations/:organization_id/invite' do
end

post '/organizations/:organization_id/data_buckets' do
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.create(organization_id: params[:organization_id], name: json_body['name']).to_json
end

put '/organizations/:organization_id/data_buckets' do
  # Changes the field definitions
  validate_user_is_organization_admin

  WhitelabelingCollector::Lib::DataBucket.create(organization_id: params[:organization_id], name: json_body['name']).to_json
end

get '/organizations/:organization_id/data_buckets/fields' do
end

post '/organizations/:organization_id/data_buckets/fields' do
end

put '/organizations/:organization_id/data_buckets/fields/:field_id' do
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions' do
  validate_user_is_organization_admin
end

post '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions' do
  validate_user_is_organization_admin
  WhitelabelingCollector::Lib::Submission.create(organization_id: params[:organization_id], data_bucket_id: params[:data_bucket_id])
end

get '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id' do
  # todo: check if user is
  #   either organization id
  #   or submitter

  WhitelabelingCollector::Lib.Submission.find(params[:submission_id])
end

put '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id' do
  # todo: check if user is
  #   either organization id
  #   or submitter

end

post '/organizations/:organization_id/data_buckets/:data_bucket_id/submissions/:submission_id/validate' do
  # todo: check if user is
  #   either organization id
  #   or submitter

  validate_user_is_organization_admin
end
