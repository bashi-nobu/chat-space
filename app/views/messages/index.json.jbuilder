json.array! @messages do |message|
  json.content  message.content
  json.user_name  message.user.name
  json.image  message.image.url
  json.created_at  message.created_at
  json.id  message.id
end
