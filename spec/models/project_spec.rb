require 'rails_helper'

describe Project, type: :model do
  subject { build :project }

  describe 'associations' do
    it { is_expected.to belong_to(:tag_group) }
    it { is_expected.to have_many(:changesets) }
  end

  describe '#as_json' do
    subject { create :project }

    (Project::JSON_ATTRIBUTES + Project::JSON_METHODS).each do |key|
      its(:as_json) { expect(subject.as_json['project']).to have_key(key) }
    end
  end

  describe '#joinable' do
    context 'when disallow_join is true' do
      let(:project) { create :project, disallow_join: true }

      it { expect(Project.joinable).not_to include(project) }
    end

    context 'when disallow_join is false' do
      let(:project) { create :project, disallow_join: false }

      it { expect(Project.joinable).to include(project) }
    end
  end

  describe '#joinable_except' do
    context 'when disallow_join is true' do
      let(:project) { create :project, disallow_join: true }
      let(:another_project) { create :project, disallow_join: true }

      it { expect(Project.joinable_except(project.id)).not_to include(project) }
      it { expect(Project.joinable_except(project.id)).not_to include(another_project) }
    end

    context 'when disallow_join is false' do
      let(:project) { create :project, disallow_join: false }
      let(:another_project) { create :project, disallow_join: false }

      it { expect(Project.joinable_except(project.id)).not_to include(project) }
      it { expect(Project.joinable_except(project.id)).to include(another_project) }
    end
  end

  describe '#last_changeset_id' do
    context 'when there are no changesets' do
      before do
        allow(subject).to receive_message_chain(:changesets).and_return([])
      end

      its(:last_changeset_id) { should be_nil }
    end

    context 'when there are changesets' do
      let(:changeset) { double('changeset', id: 42) }

      before do
        allow(subject).to receive(:changesets).and_return([nil, nil, changeset])
      end

      its(:last_changeset_id) { should == changeset.id }
    end
  end

  context 'friendly_id' do
    it 'should create a slug' do
      project = create(:project, name: 'Test Project')
      expect(project.slug).to eq('test-project')
    end

    it 'should return a message error when a slug is reserved word' do
      project = build(:project, name: 'new')
      expect(project.save).to be_falsey
      expect(project.errors.messages).to include(friendly_id: ['is reserved'])
    end
  end
end
