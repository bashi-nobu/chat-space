class GroupsController < ApplicationController
  def new  #グループ作成画面
    #ユーザーネームを取得
    @group = Group.new
    @group.users << current_user
  end

  def create  #グループ作成処理
    @group = Group.create(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
  end

  def update
  end

  private

  def group_params
    params.require(:group).permit(:name, { uswer_ids: []})
  end
end
